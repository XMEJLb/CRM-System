import type { Filter, Info } from '@/types/types'
import styles from './TabBar.module.css'
import { TabButton } from '@/UI/TabButton/TabButton'

interface TabBar {
  setArrFilter: (filter: Filter) => void
  arrFilter: Filter
  info: Info
}

export const TabBar = ({ setArrFilter, arrFilter, info }: TabBar) => {
  return (
    <>
      <div className={styles.tabBar}>
        <TabButton
          isDisabled={arrFilter === 'all'}
          text={'Все'}
          count={info.all}
          setArrFilter={() => {
            setArrFilter('all')
          }}
        />
        <TabButton
          text={'Активные'}
          isDisabled={arrFilter === 'inWork'}
          setArrFilter={() => {
            setArrFilter('inWork')
          }}
          count={info.inWork}
        />
        <TabButton
          text={'Завершенные'}
          isDisabled={arrFilter === 'completed'}
          setArrFilter={() => {
            setArrFilter('completed')
          }}
          count={info.completed}
        />
      </div>
    </>
  )
}
