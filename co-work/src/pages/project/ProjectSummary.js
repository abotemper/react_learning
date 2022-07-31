import React from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '../../components/Avatar'
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';

const ProjectSummary = ({ project }) => {
    const { deleteDocument } = useFirestore('projects')
    const { user } = useAuthContext()
    const navigate = useNavigate()
    const handleClick = (e) => {
        deleteDocument(project.id)
        navigate('/')
    }

    return (
        <div>
            <div className="project-summary">
                <h2 className="page-title"></h2>
                <p>By {project.createdBy.displayName}</p>
                <p className="due-date">
                    Project due by {project.dueDate.toDate().toDateString()}
                </p>
                <p className="details">
                    {project.details}
                </p>
                <h4>project is assigned to: </h4>

                <div className="assigned-users">
                    {project.assignedUsersList.map(user => (
                        <div key={user.id}>
                            <Avatar source={user.photoURL}/>
                        </div>
                    ))}
                </div>
            </div>
            {user.uid === project.createdBy.id && (
                  <button className="btn" onClick={handleClick}>mark as complete</button> 
             )}  
        </div>
    );
}

export default ProjectSummary;
