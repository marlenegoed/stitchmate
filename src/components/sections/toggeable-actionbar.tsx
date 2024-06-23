'use client'
import {useCounterStore} from '@/providers/counter-store-provider';
import {useDemoStore} from '@/providers/demo-store-provider';
import {useUserSettingsStore} from '@/providers/user-settings-store-provider';
import {Variants, motion} from 'framer-motion';
import {useState} from 'react';
import {CgMenuGridO} from 'react-icons/cg';
import DemoSectionDialog from '../demo/demo-section-dialog';
import {Button} from '../ui/button';
import {CountDownButton} from '../ui/count-down-button';
import {ToggleSound} from '../ui/toggle-sound-button';
import {CloneSectionButton, AddSectionButton} from './couter-actions';
import ResetDialog from './reset-dialog';

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {type: "spring", stiffness: 300, damping: 24}
  },
  closed: {opacity: 0, y: 20, transition: {duration: 0.2}}
};

export default function ToggleableActionBar() {

  const [isOpen, setIsOpen] = useState(false);

  const {storeSound, toggleStoreSound} = useUserSettingsStore(state => state)
  const {storeCount, countStoreDown} = useCounterStore(state => state)

  const resetCounterStore = useCounterStore(state => state.reset)
  const resetDemoStore = useDemoStore((state) => state.resetStore)
  const reminders = useDemoStore((state) => state.reminders)

  async function resetCounter() {
    resetDemoStore()
    resetCounterStore()
  }

  return (

    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="flex flex-col gap-4"
    >
      <motion.button
        whileTap={{scale: 0.97}}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Button size="icon" className="rounded-full text-white"><CgMenuGridO /></Button>
        {/* <ActionBar className={clsx({"hidden": !open})} /> */}
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
        className="flex flex-col gap-4"
      >
        <motion.li variants={itemVariants}>
          <CountDownButton reminders={reminders} count={storeCount} sound={storeSound} handleChange={countStoreDown} />
        </motion.li>
        <motion.li variants={itemVariants}>
          <ToggleSound sound={storeSound} onToggle={toggleStoreSound} />
        </motion.li>
        <motion.li variants={itemVariants}>
          <ResetDialog handleReset={resetCounter} />
        </motion.li>
        <motion.li variants={itemVariants}>
          {/* <UserLoginToolTip> */}
          <CloneSectionButton disabled={true} />
          {/* </UserLoginToolTip> */}
        </motion.li>
        <motion.li variants={itemVariants}>
          {/* <UserLoginToolTip> */}
          <AddSectionButton disabled={true} />
          {/* </UserLoginToolTip> */}
        </motion.li>
        <motion.li variants={itemVariants}>
          <DemoSectionDialog />
        </motion.li>
      </motion.ul>
    </motion.nav>

  )
}