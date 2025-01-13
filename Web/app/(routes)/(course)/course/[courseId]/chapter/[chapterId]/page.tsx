"use client";

// import { Banner } from "@/components/Global/banner";
import { VideoPlayerX } from "@/components/Global/VideoPlayer";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clipboard, ReceiptText } from "lucide-react";
import { getChapter } from "@/services/fetch-api";
import { Chapter } from "@/types/globalTypes";

const ChapterPage = () => {
  const courseId = useParams().courseId;
  const chapterId = useParams().chapterId;
  const [chapterData, setChapterData] = useState<Chapter>();

  useEffect(() => {
    const getChapterData = async () => {
      const response = await getChapter(chapterId as string);
      if (response) {
        setChapterData(response.data);
        console.log("Chapter Data:", response.data);
      }
    };
    if (chapterId) {
      getChapterData();
    }
  }, [chapterId]);

  return (
    <div className="">
      {/* <Banner label="Bu bölümde henüz bir konu eklenmemiş." variant="warning" /> */}

      <div className="flex flex-col max-w-5xl mx-auto">
        <div className="p-4">
          <div className="border rounded-lg overflow-hidden bg-white dark:border-gray-700">
            <VideoPlayerX
              provider="youtube"
              videoUrl={chapterData?.videoUrl as string}
              chapterId={chapterData?.documentId as string}
              title={chapterData?.title as string}
              courseId={courseId as string}
              isLocked={false}
              completeOnEnd={true}
            />
          </div>
        </div>

        <div className="flex p-4 border rounded-md bg-myColor1-400 dark:bg-slate-900 dark:border-gray-700">
          {/* Tabs Ayrı Komponent Yapılacak */}
          <Tabs
            defaultValue="details"
            className="w-[400px] flex flex-1 flex-col justify-center items-center"
          >
            <TabsList>
              <TabsTrigger value="details">
                <Clipboard className="h-4 w-4 mr-2" />
                Details
              </TabsTrigger>
              <TabsTrigger value="attachment">
                <ReceiptText className="h-4 w-4 mr-2" />
                Dosya
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <h2>{chapterData?.title}</h2>
              <p>{chapterData?.description}</p>
            </TabsContent>
            <TabsContent value="attachment">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
