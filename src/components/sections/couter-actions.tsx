'use client'

import {Project, Reminder, Section, UserSettings, cloneSection, createNewSection, setActiveSection, toggleSound, ProjectDetailsType} from '@/database/queries/queries';
import {Button} from '../ui/button';
import {updateCount} from '@/database/queries/queries';
import {useCounterStore} from '@/providers/counter-store-provider';
import SectionDialog from './section-dialog';
import ResetDialog from './reset-dialog';
import {CountDownButton} from '../ui/count-down-button';
import {useUserSettingsStore} from '@/providers/user-settings-store-provider';
// import {Tooltip} from '../ui/tooltip';
import {useToast} from '@/lib/use-toast';
import {ButtonHTMLAttributes, forwardRef, useState} from 'react';
import {HiOutlineSquare2Stack, HiOutlinePlusCircle} from 'react-icons/hi2';
import {Variants, motion} from 'framer-motion';
import {CgMenuGridO} from 'react-icons/cg';
import {cn} from '@/lib/utils';
import {HiOutlineListBullet} from "react-icons/hi2";
import ProjectDetails from '../projects/project-details';
import {SlOptionsVertical} from "react-icons/sl";


const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {type: "spring", stiffness: 300, damping: 24}
  },
  closed: {opacity: 0, y: 20, transition: {duration: 0.2}}
};

interface CounterActionProps {
  section: Section,
  userSettings: UserSettings,
  numOfSections: number,
  reminders: Reminder[],
  className?: string,
  projectDetails: ProjectDetailsType,
  project: Project,
}

export default function CounterActionBar({section, userSettings, numOfSections, reminders, className, projectDetails, project}: CounterActionProps) {
  const {storeSound, toggleStoreSound} = useUserSettingsStore(state => state)
  const resetCounter = useCounterStore(state => state.reset)
  const [isOpen, setIsOpen] = useState(false)

  async function handleSoundToggle() {
    toggleStoreSound()
    await toggleSound(userSettings.userId)
  }

  async function handleReset() {
    await updateCount(userSettings.userId, section.id, 1)
    resetCounter()
  }

  return (

    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className={cn("flex flex-col-reverse justify-center items-center gap-4", className)}
    >
      <motion.button
        whileTap={{scale: 0.97}}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="h-12 w-12 bg-sienna-100 flex justify-center items-center rounded-full text-sienna-400 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"><SlOptionsVertical size={20} /></div>
      </motion.button>
      <motion.ul
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05
            }
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3
            }
          }
        }}
        style={{pointerEvents: isOpen ? "auto" : "none"}}
        className="flex flex-col gap-6"
      >
        <motion.li variants={itemVariants} className='bg-neutral-100/50 rounded-full'>
          <CountDown userId={userSettings.userId} sectionId={section.id} sound={storeSound} reminders={reminders} />
        </motion.li>
        {/* <motion.li variants={itemVariants} className='bg-neutral-100/50 rounded-full'>
          <ResetDialog handleReset={handleReset} />
        </motion.li> */}
        <motion.li variants={itemVariants} className='bg-neutral-100/50 rounded-full'>
          <CloneSection userId={userSettings.userId} section={section} />
        </motion.li>
        <motion.li variants={itemVariants} className='bg-neutral-100/50 rounded-full'>
          <AddSection userId={userSettings.userId} projectId={section.projectId} position={section.position} />
        </motion.li>
        <motion.li variants={itemVariants} className='bg-neutral-100/50 rounded-full'>
          <SectionDialog userId={userSettings.userId} section={section} />
        </motion.li>
        <motion.li variants={itemVariants} className='bg-neutral-100/50 rounded-full'>
          <ProjectDetails project={project} projectDetails={projectDetails} />
        </motion.li>
      </motion.ul>
    </motion.nav>
  )
}


interface AddSectionProps {
  userId: string,
  projectId: number,
  position: number
}

export function AddSection({userId, projectId, position}: AddSectionProps) {
  const {toast} = useToast()
  async function handleNewSection() {
    const newPosition = position + 1
    const newSectionTitle = `Section ${newPosition}`
    await createNewSection(userId, projectId, newPosition, newSectionTitle)
    toast({title: "Section created"})
  }

  return (
    // <Tooltip title="Add section">
    <AddSectionButton onMouseDown={handleNewSection} />
    // </Tooltip>
  )
}

const AddSectionButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => (
  <Button
    className='rounded-full'
    type='button'
    size='icon'
    // variant='ghost'
    ref={ref}
    {...props}
  >
    <span className='h-4 w-4 border border-white rounded flex items-center justify-center'>+</span>
  </Button>
))
AddSectionButton.displayName = "AddSectionButton"

export function CountDown({userId, sectionId, sound, reminders}: {userId: string, sectionId: number, sound: boolean, reminders: Reminder[]}) {
  const {storeCount, setStoreCount} = useCounterStore(
    (state) => state,
  )

  async function handleCountDown(newCount: number) {
    setStoreCount(newCount)
    await updateCount(userId, sectionId, newCount)
    await setActiveSection(userId, sectionId)
  }

  return <CountDownButton count={storeCount} handleChange={handleCountDown} sound={sound} reminders={reminders} />
}

export function CloneSection({userId, section}: {userId: string, section: Section}) {
  const {toast} = useToast()
  async function handleClick() {
    await cloneSection(userId, section)
    toast({
      title: "Section cloned"
    })
  }

  return (
    // <Tooltip title='Duplicate section'>
    <CloneSectionButton onMouseDown={handleClick} />
    // </Tooltip>
  )
}

const CloneSectionButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => (
  <Button
    className='rounded-full'
    type='button'
    size='icon'
    // variant='ghost'
    ref={ref}
    {...props}
  >
    <HiOutlineSquare2Stack size={24} />
  </Button>
))
CloneSectionButton.displayName = "CloneSectionButton"



export {CloneSectionButton, AddSectionButton}