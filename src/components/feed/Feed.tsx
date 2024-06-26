import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/tabs/Tabs";
import Posts from "@/components/posts/Posts";

const Feed: React.FC = () => {
  return (
    <div>
      <Tabs defaultValue="account" className="w-1/1">
        <TabsList className="h-16 border">
          <TabsTrigger value="account" className="w-1/2">
            For you
          </TabsTrigger>
          <TabsTrigger value="password" className="w-1/2">
            Following
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Posts />
        </TabsContent>
        <TabsContent value="password">Posts of people you follow.</TabsContent>
      </Tabs>
    </div>
  );
};

export default Feed;
