import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="">
      <Button className="bg-red-500 text-white py-6 px-10 rounded-full">
        Click me
      </Button>
      <Button variant="secondary">
        Click me
      </Button>
      <Button variant="outline">
        Click me
      </Button>
    </div>
  );
}
