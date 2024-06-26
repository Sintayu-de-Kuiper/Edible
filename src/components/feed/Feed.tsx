import React from "react";
import Posts from "@/components/posts/Posts";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/tabs/Tabs";

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
          <div>
            <Posts />
          </div>
        </TabsContent>
        <TabsContent value="password">Posts of people you follow.</TabsContent>
      </Tabs>
    </div>
  );
};

export default Feed;
