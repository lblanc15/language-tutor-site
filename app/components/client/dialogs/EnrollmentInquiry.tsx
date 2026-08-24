"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const EnrollmentInquiry = () => {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get('dialog') === 'contact';
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("0");
  const handleClose = () => {
    router.push(window.location.pathname, { scroll: false });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="p-8 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl text-blue-950">
            Academia de Español Rico - Spanish Foundations 
          </DialogTitle>
          <DialogDescription className="font-body text-[11px]">
            Hola! Thank you for your interest in Curso de Español: Spanish Foundations by Academia de Español Rico.
            This is a complete and structured Spanish learning package designed for learners who want to build real confidence in Spanish—from the foundations of the language to practical communication for everyday situations, work opportunities, travel, and conversations.
            Classes are live, interactive, and guided step by step. You will develop your vocabulary, grammar, pronunciation, listening, speaking, and confidence throughout the course.
            <br /><br />  
            <span className="text-red-800 text-[10px]">Filling out this registration form does not secure a slot. Enrollment is confirmed only after the required payment has been received and verified.</span>
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={0} value={activeTab} className="w-full font-body">
          <TabsList className="hidden">
            <TabsTrigger value="0"></TabsTrigger>
            <TabsTrigger value="1"></TabsTrigger>
            <TabsTrigger value="2"></TabsTrigger>
            <TabsTrigger value="3"></TabsTrigger>
            <TabsTrigger value="4"></TabsTrigger>
            <TabsTrigger value="5"></TabsTrigger>
          </TabsList>
          <TabsContent keepMounted value="0">
            <div className="font-bold mb-2 mt-2 text-blue-950">Course Details</div>
            <ul className="grid grid-cols-2 lg:grid-cols-[.5fr_1fr_.7fr] gap-2">
              <li className="text-xs">
                <span className="font-bold">Start Date:</span><br />August 11, 2026
              </li>
              <li className="text-xs">
                <span className="font-bold">Schedule:</span><br />Tuesdays & Thursdays, 6:00 PM–8:00 PM
              </li>
              <li className="text-xs">
                <span className="font-bold">Format:</span><br />Live via Google Meet
              </li>
              <li className="text-xs">
                <span className="font-bold">Class Type:</span><br />Group Class
              </li>
              <li className="text-xs">
                <span className="font-bold">Total Learning Hours:</span><br />60 hours
              </li>
              <li className="text-xs">
                <span className="font-bold">Duration:</span><br />30 sessions
              </li>
            </ul>
            <div className="flex justify-end w-full mt-12">
              <Button onClick={() => setActiveTab("1")} className="text-xs rounded-lg  hover:bg-red-700 px-8 text-white! bg-red-800" variant="ghost">Next</Button>
            </div>
          </TabsContent>
          <TabsContent keepMounted value="1">
            <div className="font-bold mb-3">Personal Details</div>
            <div className="flex justify-between w-full mt-12">
              <Button onClick={() => setActiveTab("0")} className="text-xs rounded-lg px-8 border border-slate-900" variant="ghost">Back</Button>
              <Button onClick={() => setActiveTab("2")} className="text-xs rounded-lg  hover:bg-red-700 px-8 text-white! bg-red-800" variant="ghost">Next</Button>
            </div>
          </TabsContent>
          <TabsContent keepMounted value="2">
            <div className="font-bold mb-3">Spanish Proficiency</div>
            <Button onClick={() => setActiveTab("3")} className="text-xs rounded-lg hover:bg-red-700 px-4 text-white! bg-red-800" variant="ghost">Next</Button>
          </TabsContent>
          <TabsContent keepMounted value="3">
            <div className="font-bold mb-3">Schedule and Payment Plans</div>
            <Button onClick={() => setActiveTab("4")} className="text-xs rounded-lg hover:bg-red-700 px-4 text-white! bg-red-800" variant="ghost">Next</Button>
          </TabsContent>
          <TabsContent keepMounted value="4">
            <div className="font-bold mb-3">Data Privacy</div>
            <Button onClick={() => setActiveTab("5")} className="text-xs rounded-lg hover:bg-red-700 px-4 text-white! bg-red-800" variant="ghost">Submit</Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}