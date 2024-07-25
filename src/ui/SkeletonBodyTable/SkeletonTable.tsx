import { Skeleton, Stack } from '@mui/joy'

interface SkeletonBodyTableProps {
  itemsPerPage: number
}

export default function SkeletonBodyTable({ itemsPerPage }: SkeletonBodyTableProps) {
  const skeletonBodyTable = Array.from({ length: itemsPerPage })

  return (
    <>
      {skeletonBodyTable.map((_, index) => (
        <tr key={index}>
          <td style={{ textAlign: 'center', width: 48 }}>
            <Skeleton variant='circular' width={24} height={24} />
          </td>
          <td>
            <Skeleton variant='text' width={100} />
          </td>
          <td>
            <Skeleton variant='text' width={100} />
          </td>
          <td>
            <Skeleton variant='text' width={100} />
          </td>
          <td>
            <Stack direction='row' alignItems='center'>
              <Skeleton variant='circular' width={32} height={32} />
              <div>
                <Skeleton variant='text' width={80} />
                <Skeleton variant='text' width={120} />
              </div>
            </Stack>
          </td>
          <td>
            <Stack direction='row' alignItems='center' spacing={1}>
              <Skeleton variant='circular' width={24} height={24} />
              <Skeleton variant='circular' width={24} height={24} />
              <Skeleton variant='circular' width={24} height={24} />
            </Stack>
          </td>
        </tr>
      ))}
    </>
  )
}
