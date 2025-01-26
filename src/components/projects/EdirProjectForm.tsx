import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { Project, ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/API/ProjectAPI";
import { toast } from "react-toastify";

type EdirProjectFormProps = {
    data: ProjectFormData
    projectId: Project['_id']
}

export default function EdirProjectForm({ data, projectId }: EdirProjectFormProps) {
    const navigate = useNavigate()

    const initialValues: ProjectFormData = {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const queeryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queeryClient.invalidateQueries({queryKey: ['projects']})
            queeryClient.invalidateQueries({queryKey: ['editProject', projectId]})
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData: ProjectFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data)
    }

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black">Editar Proyecto</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">
                LLena el siguiente formulario para editar el proyecto
            </p>

            <nav className="my-5">
                <Link
                    to='/'
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                >
                    Volver a Proyectos
                </Link>

            </nav>

            <form
                className="mt-10 bg-white shadow-lg rounded-lg p-10"
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >
                <ProjectForm
                    register={register}
                    errors={errors}
                />

                <input
                    type="submit"
                    value='Editar proyecto'
                    className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
                />
            </form>
        </div>
    )
}
