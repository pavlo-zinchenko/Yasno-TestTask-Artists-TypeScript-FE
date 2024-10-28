import { Box } from '@mui/material';
import { ChildrenProps } from '@interfaces';

export default function Container({ children }: ChildrenProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flexGrow: 1,
        padding: '20px',
      }}
    >
      {children}
    </Box>
  );
}
