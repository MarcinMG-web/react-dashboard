import { keyframes } from '@emotion/react';
import { styled } from '@mui/joy';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { StyledComponent } from '@emotion/styled';

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

export const AnimatedErrorOutlineIcon: StyledComponent<SvgIconProps> = styled(ErrorOutlineIcon)`
  font-size: 120px;
  color: var(--joy-palette-danger-500, #c41c1c);
  animation: ${bounce} 2s infinite;
`;

export const AnimatedLockPersonIcon: StyledComponent<SvgIconProps> = styled(LockPersonIcon)`
  font-size: 120px;
  color: var(--joy-palette-danger-500, #c41c1c);
  animation: ${bounce} 2s infinite;
`;

export const AnimatedReportProblemIcon: StyledComponent<SvgIconProps> = styled(ReportProblemIcon)`
  font-size: 120px;
  color: var(--joy-palette-danger-500, #c41c1c);
  animation: ${bounce} 2s infinite;
`;

export const AnimatedRunningWithErrorsIcon: StyledComponent<SvgIconProps> = styled(RunningWithErrorsIcon)`
  font-size: 120px;
  color: var(--joy-palette-danger-500, #c41c1c);
  animation: ${bounce} 2s infinite;
`;
