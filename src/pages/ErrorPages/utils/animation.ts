import { keyframes } from '@emotion/react';
import { styled } from '@mui/joy';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';

export const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

export const AnimatedErrorOutlineIcon = styled(ErrorOutlineIcon)`
  font-size: 120px;
  color: var(--color-myBrown);
  animation: ${bounce} 2s infinite;
`;

export const AnimatedLockPersonIcon = styled(LockPersonIcon)`
  font-size: 120px;
  color: var(--color-myBrown);
  animation: ${bounce} 2s infinite;
`;

export const AnimatedReportProblemIcon = styled(ReportProblemIcon)`
  font-size: 120px;
  color: var(--color-myBrown);
  animation: ${bounce} 2s infinite;
`;

export const AnimatedRunningWithErrorsIcon = styled(RunningWithErrorsIcon)`
  font-size: 120px;
  color: var(--color-myBrown);
  animation: ${bounce} 2s infinite;
`;
