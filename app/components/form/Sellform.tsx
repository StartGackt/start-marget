'use client'
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '../SubmitButton';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { redirect } from "next/navigation"
import { toast } from "sonner";
import { type State, SellProduct } from '../../actions';
import { JSONContent } from '@tiptap/react';
import { useState } from 'react';
import { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Textarea } from '@/components/ui/textarea';
import SelectCategory from '../SelectCategory';
import { EditorContent } from '@tiptap/react';
import { UploadDropzone } from "../../lib/uploadthing";
import { TiptapEditor } from "../../components/Editor";




export function Sellform() {
    const initialState: State = { message: "", status: undefined };
    const [state, formaction] = useFormState(SellProduct, initialState);
    const [json, setJson] = useState<null | JSONContent>(null);
    const [images, setImages] = useState<null | string[]>(null);
    const [productFile, setProductFile] = useState<null | string>(null);

    useEffect(() => {
        if (state?.status === "success") {
            toast.success(state?.message);
            redirect("/");
        } else if (state?.status === "error") {
            toast.error(state?.message);
        }
    }, [state]);
    return (
        
        <form action={formaction}>
        <CardHeader>
            <CardTitle>Sell Products</CardTitle>
            <CardDescription>Please fill out the form</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-2">
                <Label>Name</Label>
                <Input name="name" type="text" placeholder="Name Of Product" required minLength={3} />
                {state?.error?.name && <p className="text-red-500">{state?.error?.name}</p>}
            </div>
            <div className="flex flex-col gap-y-2">
                <Label className="font-medium">Category</Label>
                <SelectCategory />
                {state?.error?.category && <p className="text-red-500">{state?.error?.category}</p>}
            </div>
            <div className="flex flex-col gap-y-2">
                <Label>Price</Label>
                <Input name="price" type="number" placeholder="10 bath"  required minLength={1}/>
                {state?.error?.price && <p className="text-red-500">{state?.error?.price}</p>}
            </div>
            <div className="flex flex-col gap-y-2">
                <Label>Small Summary</Label>
                <Textarea name="smallDescription" placeholder="Please briefly describe your product details" required minLength={10} />
                {state?.error?.smallDescription && <p className="text-red-500">{state?.error?.smallDescription}</p>}
            </div>
            <div className="flex flex-col gap-y-2">
                <input type="hidden" name="description" value={JSON.stringify(json)} />
                <Label>Description</Label>
                <TiptapEditor setJson={setJson} json={json} />
                {state?.error?.description && <p className="text-red-500">{state?.error?.description}</p>}
            </div>
            <div className="flex flex-col gap-y-2">
                <Label>Product Images</Label>
                <input type="hidden" name="images" value={JSON.stringify(images)} />
                <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        setImages(res.map((item) => item.url));
                        toast.success('Upload Image Success');
                    }}
                    onUploadError={(error: Error) => {
                        toast.error('Upload Image Failed');
                        throw new Error(`Error: ${error}`);
                    }}
                />
                {state?.error?.images && <p className="text-red-500">{state?.error?.images}</p>}
            </div>
            <div className="flex flex-col gap-y-2">
                <input type="hidden" name="productFile" value={productFile ?? ''} />
                <Label>Product File</Label>
                <UploadDropzone
                    endpoint="productFileUploader"
                    onClientUploadComplete={(res) => {
                        setProductFile(res[0].url);
                        toast.success('Upload File Success');
                    }}
                    onUploadError={(error: Error) => {
                        toast.error('Upload File Failed');
                        throw new Error(`Error: ${error}`);
                    }}
                />
                {state?.error?.productFile && <p className="text-red-500">{state?.error?.productFile}</p>}
            </div>
        </CardContent>
        <CardFooter className="mt-5">
           <SubmitButton title="create product" />
        </CardFooter>
    </form>
    )
}