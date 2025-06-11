import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ProjectItemDetails() {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await fetch(`https://shatably.runasp.net/api/Projects/${projectId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProject(data);
            } catch (err) {
                console.error("Failed to fetch project details:", err);
                setError("Failed to load project details. Please try again later.");
                toast.error("Failed to load project details.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, [projectId]);

    if (loading) {
        return <div className="text-center mt-20 text-xl">Loading project details...</div>;
    }

    if (error) {
        return <div className="text-center mt-20 text-red-500 text-xl">{error}</div>;
    }

    if (!project) {
        return <div className="text-center mt-20 text-xl">Project not found.</div>;
    }

    return (
        <div className="sm:px-6 lg:px-8 mb-[100px] mt-[3rem]">
            <div className="max-w-4xl mx-auto py-12 bg-white rounded-[25px] shadow-md p-8">
                <h1 className="text-3xl font-bold mb-4 text-[#16404D]">{project.title}</h1>
                {project.mainImageURL && (
                    <img src={project.mainImageURL} alt={project.title} className="w-full h-64 object-cover rounded-md mb-6" />
                )}
                <p className="text-gray-700 mb-4">{project.description}</p>
                {project.price && <p className="text-lg font-semibold text-[#16404D] mb-2">Price: {project.price} EGP</p>}
                {project.createdDate && <p className="text-gray-600 text-sm">Created Date: {new Date(project.createdDate).toLocaleDateString()}</p>}
                
                {/* Placeholder for offers - if your project API returns offers, we can display them here. */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[#16404D]">Offers & Details</h2>
                    <p className="text-gray-500">Specific project offers or additional details would go here.</p>
                </div>
                
                <button onClick={() => toast.info("Contact functionality for projects coming soon!")} className="mt-8 px-6 py-2 bg-[#16404D] text-white rounded-[25px] hover:bg-[#16404D]/90">Get a Quote</button>
            </div>
        </div>
    );
} 