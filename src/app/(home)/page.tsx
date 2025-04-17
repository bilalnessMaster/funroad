import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";


export default function Home() {
  return (
    <div className="flex flex-col gap-y-4 p-4">
      <div>
        <Button variant='elevated'>
          HELLO
        </Button>
      </div>
      <div>
        <Input placeholder="I am input " />
      </div>
      <div>
        <Progress value={22} />
      </div>
      <div>
        <Textarea />
      </div>
      <div>
        <Checkbox />
      </div>
    </div>
  );
}
