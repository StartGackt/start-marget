'use client'

import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '../SubmitButton';
import {type State, UpdateUserSettings } from '../../actions';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { redirect } from "next/navigation"
import { toast } from "sonner";

interface iAppProps {
    firstName: string
    lastName: string
    email: string
}
export default function SettingsForm({ firstName, lastName, email }: iAppProps) {
    const initalState: State = {message: "", status: undefined}
    const [state, formaction] = useFormState(UpdateUserSettings,initalState)
    useEffect(() => {
        if (state?.status === "error") {
            toast.error(state?.message);
            redirect("/");
        } else if (state?.status === "success") {
            toast.success(state?.message);
        }
    },[state])
    return (
        <form action={formaction}>
           <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Here will find settings</CardDescription>
           </CardHeader>
           <CardContent className='flex flex-col gap-y-5'>
                <div className='flex flex-col gap-y-2'>
                  <Label>First Name</Label>
                  <Input name='firstName' type='text' defaultValue={firstName} />
                </div>
                <div className='flex flex-col gap-y-2'>
                  <Label>Last Name</Label>
                  <Input name='lastName' type='text' defaultValue={lastName} />
                </div>
                <div className='flex flex-col gap-y-2'>
                  <Label>Email</Label>
                  <Input name='email' type='text' disabled defaultValue={'@startover.de'} />
                </div>
                
           </CardContent>
           <CardFooter>
                <SubmitButton title='Update settings'/>
           </CardFooter>
        </form>
    )
}