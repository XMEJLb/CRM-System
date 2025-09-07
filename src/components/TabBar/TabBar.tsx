import type { Filter, Info } from '@/types/types'
import { Badge, Tabs, type TabsProps, theme } from 'antd'

interface TabBar {
  setArrFilter: (filter: Filter) => void
  arrFilter: Filter
  info: Info
}

export const TabBar = ({ setArrFilter, info, arrFilter }: TabBar) => {
  const { token } = theme.useToken()
  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: (
        <span>
          Все{' '}
          <Badge
            style={{ backgroundColor: token.colorPrimary }}
            count={info.all}
            size="small"
            showZero
          />
        </span>
      ),
    },
    {
      key: 'inWork',
      label: (
        <span>
          Активные{' '}
          <Badge
            style={{ backgroundColor: token.colorWarning }}
            count={info.inWork}
            size="small"
            showZero
          />
        </span>
      ),
    },
    {
      key: 'completed',
      label: (
        <span>
          Завершенные{' '}
          <Badge
            style={{ backgroundColor: token.colorSuccess }}
            count={info.completed}
            size="small"
            showZero
          />
        </span>
      ),
    },
  ]

  const onChange: TabsProps['onChange'] = (key) => {
    setArrFilter(key as Filter)
  }
  return <Tabs defaultActiveKey={arrFilter} items={items} onChange={onChange} />
}
