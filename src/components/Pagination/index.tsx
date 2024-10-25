import { Pagination as PaginationUI, Box } from '@mui/material';

interface PaginationProps {
  totalPages: number;
  page: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({
  totalPages,
  page,
  onPageChange,
}: PaginationProps): JSX.Element {
  return (
    <Box sx={{ mt: 3, mb: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PaginationUI
        count={totalPages}
        page={page}
        color="primary"
        onChange={(_, newPage) => onPageChange(newPage)}
        sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}
      />
    </Box>
  );
}
