import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useUserStore } from "@/store/user";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";

// Define the APIError type for error handling
interface APIError {
    type: string;
    message: string;
};

type ProjectProps = {
    name: string;
    description: string;
    tags: string[];
    ownerId: string;
}

function Projects() {
    const emptyProject = {
        name: "",
        description: "",
        tags: [],
        ownerId: ""
    }
    const [newProject, setNewProject] = useState<ProjectProps>(emptyProject);
    const [tag, setTag] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);
    const userData = useUserStore((state) => state.userData);
    const token = useUserStore((state) => state.token);
    const api = import.meta.env.VITE_API_BASE_URL;

    const handleProjectName = (value: string) => {
        setNewProject((prev) => ({
            ...prev,
            name: value
        }));
    }
    const handleProjectDesc = (value: string) => {
        setNewProject((prev) => ({
            ...prev,
            description: value
        }))
    }
    const addTagToProject = (value: string) => {
        if (value === "") {
            return;
        }
        if (newProject.tags.length === 0) {
            setNewProject((prev) => ({
                ...prev,
                tags: [...prev.tags, value]
            }));
            setTag("");
        } else {
            if (newProject.tags.includes(value)) {
                setTag("");
                return;
            } else {
                setNewProject((prev) => ({
                    ...prev,
                    tags: [...prev.tags, value]
                }))
                setTag("");
            }
        }
    }
    const removeTagFromProject = (target: HTMLElement) => {
        const value = target.innerText;
        const currentTags = newProject.tags;
        const newTags = currentTags.filter((tag) => tag !== value);

        setNewProject((prev) => ({
            ...prev,
            tags: [...newTags]
        }));
    }
    const resetNewProject = () => {
        setNewProject(emptyProject);
    }
    const createNewProject = async () => {
        if (newProject.name === "" || newProject.tags.length === 0 || newProject.description === "") {
            return;
        }
        newProject.ownerId = userData._id;

        try {
            const res = await axios.post(
                `${api}/api/new-project`,
                { ...newProject },
                {
                    headers: {
                        "x-auth-token": token
                    }
                }
            );
            if (res.data.type === "success") {
                toast({
                    title: "Success!",
                    description: res.data.message,
                    variant: "info"
                })
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                const apiError = err.response?.data as APIError;
                if (apiError?.type == "error") {
                    const errorMessage = apiError?.message;
                    toast({
                        title: "Uh oh! Something went wrong.",
                        description: errorMessage,
                        variant: "destructive"
                    })
                } else {
                    const errorMessage = "Unexpected error! Please try again later.";
                    toast({
                        title: "Uh oh! Something went wrong.",
                        description: errorMessage,
                        variant: "destructive",
                    });
                }
            } else {
                const errorMessage = "Unexpected error! Please try again later.";
                toast({
                    title: "Uh oh! Something went wrong.",
                    description: errorMessage,
                    variant: "destructive",
                });
            }
        }

        resetNewProject();
        setIsOpen(false);
    }
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="font-semibold text-xl">Projects</div>
                <div>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button><Plus />New Project</Button>
                        </DialogTrigger>
                        <DialogContent className="content sm:max-w-[425px] max-h-screen overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>New Project</DialogTitle>
                                <DialogDescription>
                                    Create a new project. You will be the owner of this project. Add tags to your project for quick search.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col items-start gap-2">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input id="name" defaultValue={newProject.name} className="" placeholder="Project name..." onChange={(e) => handleProjectName(e.target.value)} maxLength={30} />
                                </div>
                                <div className="flex flex-col items-start gap-2">
                                    <Label htmlFor="description" className="text-right">
                                        Description
                                    </Label>
                                    <Textarea id="description" defaultValue={newProject.description} className="" placeholder="Add description of your project..." onChange={(e) => handleProjectDesc(e.target.value)} maxLength={150} />
                                </div>
                                <div className="flex flex-col items-start gap-2">
                                    <div className="flex justify-between items-center gap-4">
                                        <Label className="text-right">
                                            Tags
                                        </Label>
                                        {/* {newProject.tags.length > 0 && <div className="text-xs flex gap-2 items-center"><Info className="h-4 w-4" />Click on tag to delete</div>} */}
                                    </div>
                                    <div className="h-16 w-full border-2 rounded-lg p-1 overflow-y-auto content">
                                        {newProject.tags.length > 0 && newProject.tags.map((tag) => (
                                            <Badge key={tag} variant={"secondary"} className="cursor-pointer mr-1" onClick={(e) => removeTagFromProject(e.target as HTMLElement)}>{tag}</Badge>
                                        ))}
                                    </div>

                                    <div className="flex gap-2 w-full">
                                        <Input id="tag" className="" placeholder="Enter tag and click Add..." value={tag} onChange={(e) => setTag(e.target.value)} maxLength={15} />
                                        <Button variant={"secondary"} onClick={() => addTagToProject(tag)}>Add</Button>
                                    </div>

                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={createNewProject}>Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

        </>
    )
}

export default Projects;