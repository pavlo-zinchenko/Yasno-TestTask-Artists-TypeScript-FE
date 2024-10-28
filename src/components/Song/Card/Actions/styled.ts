import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';

const SActionsContainer = styled(Box)(() => ({
    position: 'absolute',
    bottom: 0,
    margin: 0,
    padding: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
}));

export default SActionsContainer;
