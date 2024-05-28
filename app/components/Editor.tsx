'use client'// Import necessary components and types from React, Tiptap, and custom UI components
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button'; // Make sure to adjust the import path as per your project structure
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import type { JSONContent } from '@tiptap/react';

// MenuBar component: Provides buttons for text formatting
interface MenuBarProps {
    editor: Editor | null;
}

export const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className='flex flex-wrap gap-5'>
            <Button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'secondary'} type='button' aria-label="Toggle Heading 1">
                H1
            </Button>
            <Button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'secondary'} type='button' aria-label="Toggle Heading 2">
                H2
            </Button>
            <Button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'secondary'} type='button' aria-label="Toggle Heading 3">
                H3
            </Button>
            <Button onClick={() => editor.chain().focus().toggleBold().run()} variant={editor.isActive('bold') ? 'default' : 'secondary'} type='button' aria-label="Toggle Bold">
                Bold
            </Button>
            <Button onClick={() => editor.chain().focus().toggleItalic().run()} variant={editor.isActive('italic') ? 'default' : 'secondary'} type='button' aria-label="Toggle Italic">
                Italic
            </Button>
            <Button onClick={() => editor.chain().focus().toggleStrike().run()} variant={editor.isActive('strike') ? 'default' : 'secondary'} type='button' aria-label="Toggle Strike">
                Strike
            </Button>
        </div>
    );
};

// TiptapEditor component: Main component for the editor setup
interface TiptapEditorProps {
    setJson: (json: JSONContent) => void;
    json: JSONContent | null;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({ setJson, json }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: json ?? '',
        editorProps: {
            attributes: {
                class: 'focus:outline-none min-h-[150px] prose prose-sm sm:prose-base',
            },
        },
        onUpdate: () => {
            if (editor) {
                setJson(editor.getJSON());
            }
        }
    });

    // Cleanup function to destroy the editor on unmount
    useEffect(() => {
        return () => {
            editor?.destroy();
        };
    }, [editor]);

    return (
        <div>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className='rounded-lg border p-2 min-h-[150px] mt-2' />
        </div>
    );
};
