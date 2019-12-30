import * as React from 'react';

export type OnChangeData = {
  newOffset: number;
  newPageIndex: number
};

export type OffsetPaginationProps = {
  className?: string; // for StyledComponents; default empty
  offset: number;
  limit: number;
  totalItems: number;
  boundaryRange?: number; // default: 1
  siblingRange?: number; // default: 2
  showFirstAndLastNav?: boolean; // default false
  previousNavIcon?: React.ReactNode; // default: text "<"
  nextNavIcon?: React.ReactNode; // default: text ">"
  firstNavIcon?: React.ReactNode; // default: text "<<"
  lastNavIcon?: React.ReactNode; // default: text ">>"
  onChange?: (paginationData: OnChangeData, clickEvent: React.SyntheticEvent) => void;
};
