import { Skeleton } from '@mui/joy'

export default function SkeletonHeadTable(): JSX.Element {
  return (
    <tr>
      <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
        <Skeleton variant='text' width={48} />
      </th>
      <th style={{ width: 120, padding: '12px 6px' }}>
        <Skeleton variant='text' width={120} />
      </th>
      <th style={{ width: 140, padding: '10px 6px' }}>
        <Skeleton variant='text' width={140} />
      </th>
      <th style={{ width: 140, padding: '10px 6px' }}>
        <Skeleton variant='text' width={140} />
      </th>
      <th style={{ width: 140, padding: '10px 6px' }}>
        <Skeleton variant='text' width={140} />
      </th>
      <th style={{ width: 160, padding: '10px 6px' }}>
        <Skeleton variant='text' width={160} />
      </th>
    </tr>
  )
}
