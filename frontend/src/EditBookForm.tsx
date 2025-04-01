import { useState } from "react";
import { Project } from "../types/Project";
import { updateProject } from "../api/ProjectsAPI";

interface EditProjectFormProps {
    project: Project;
    onSuccess: () => void;
    onCancel: () => void;
}

const EditProjectForm = ({ project, onSuccess, onCancel}: EditProjectFormProps) => {
    const [formData, setFormData] =useState<Project>({...project}); 

    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const handelSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateProject(formData.projectId, formData);
        onSuccess();
    }

    return (
        <form onSubmit={handelSubmit}>
            <h2>Update Project</h2>
            <label>Project Name: 
                <input 
                type='text' 
                name='projectName'  
                value={formData.projectName} 
                onChange={handelChange}/>
            </label>
            <label>Project Type: 
                <input 
                type='text' 
                name='projectType'  
                value={formData.projectType} 
                onChange={handelChange} />
            </label>
            <label>Regional Program: 
                <input 
                type='text'  
                name='projectRegionalProgram'  
                value={formData.projectRegionalProgram} 
                onChange={handelChange}/>
            </label>
            <label>Impact: 
                <input 
                type='number' 
                name='projectImpact'  
                value={formData.projectImpact} 
                onChange={handelChange} />
            </label>
            <label>Project Phase: 
                <input 
                type='text' 
                name='projectPhase'  
                value={formData.projectPhase} 
                onChange={handelChange} />
            </label>
            <label>Project Functionality Status: 
                <input 
                type='text'  
                name='projectStatus'  
                value={formData.projectFunctionalityStatus}
                onChange={handelChange}/>
            </label>
            <button type='submit'>Add Project</button>
            <button type='button' onClick={onCancel}>
                Cancel
            </button>
        </form>
    )
};

export default EditProjectForm;