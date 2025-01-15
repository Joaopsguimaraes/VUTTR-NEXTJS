import { listToolsSchema } from "@/validations/list-tools";
import { CardTools } from "./card-tools";
import { CreateTool } from "./create-tool";
import { db } from "@/lib/prisma";

export async function ListTools() {
  const data = await db.tool.findMany();
  const dataFormatted = listToolsSchema.parse(data);

  return (
    <div className="w-[1100px] mt-10 flex items-center gap-4 flex-col">
      <CreateTool />
      {dataFormatted?.map((data) => (
        <CardTools
          key={data.id}
          name={data.name}
          description={data.description}
          tags={data.tags}
          id={data.id.toString()}
        />
      ))}
    </div>
  );
}
