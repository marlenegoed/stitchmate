import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {FaFrog} from "react-icons/fa6";
import {HiOutlineCheckBadge, HiOutlineClock} from "react-icons/hi2";
import {DatePickerStart, DatePickerFinishedBy, DatePickerCompleted, DatePickerPlanned} from './project-date-picker';


export default function ProjectFormStatus({createdAt, finishBy, completed, startDate, status}: {createdAt: Date, finishBy?: Date, completed?: Date, startDate: Date, status?: string}) {

  const triggerClass = 'w-28 bg-neutral-100 rounded-full gap-2 data-[state=active]:border data-[state=active]:border-sienna-400 data-[state=active]:bg-sienna-100/50 data-[state=active]:text-sienna-400'

  return (
    <>
      <Tabs defaultValue={status} className="">
        <TabsList className="flex gap-4 bg-transparent justify-start flex-wrap h-fit">

          <TabsTrigger
            className={triggerClass}
            value="wip"
          >
            wip
          </TabsTrigger>

          <TabsTrigger
            className={triggerClass}
            value="finished"
          >
            finished<HiOutlineCheckBadge />
          </TabsTrigger>

          <TabsTrigger className={triggerClass} value="paused">paused</TabsTrigger>
          <TabsTrigger className={triggerClass} value="frogged">frogged<FaFrog /></TabsTrigger>
          <TabsTrigger
            className={triggerClass}
            value="planned"
          >
            planned<HiOutlineClock />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="wip" className='flex flex-col gap-4 mt-6'>
          <DatePickerStart createdAt={createdAt} />
          <DatePickerFinishedBy finishBy={finishBy} />
        </TabsContent>
        <TabsContent value="finished" className='flex flex-col gap-4 mt-0'>
          <DatePickerStart createdAt={createdAt} />
          <DatePickerCompleted completed={completed} createdAt={createdAt} />
        </TabsContent>
        <TabsContent value="paused" className='flex flex-col gap-4 mt-0'>
          <DatePickerStart createdAt={createdAt} />
        </TabsContent>
        <TabsContent value="frogged" className='flex flex-col gap-4 mt-0'>
          <DatePickerStart createdAt={createdAt} />
        </TabsContent>
        <TabsContent value="planned" className='flex flex-col gap-4 mt-0'>
          <DatePickerPlanned startDate={startDate} />
        </TabsContent>
      </Tabs>
    </>
  )
}