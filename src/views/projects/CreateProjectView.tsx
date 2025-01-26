import ProjectForm from "@/components/projects/ProjectForm";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify'
import { Link, useNavigate } from "react-router-dom";
import type { ProjectFormData } from "@/types/index";
import { createProject } from "@/API/ProjectAPI";
import { useMutation } from "@tanstack/react-query";

export default function CreateProjectView() {

    const navegate = useNavigate()
    const initialValues: ProjectFormData = {
        projectName: "",
        clientName: "",
        description: ""
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            navegate('/')
        }
    })

    const handleForm = (formData: ProjectFormData) => mutate(formData)

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black">Crear Proyecto</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">
                LLena el siguiente formulario para crear un proyecto
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
                    value='Crear proyecto'
                    className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
                />
            </form>
        </div>
    )
}
