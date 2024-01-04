import React from 'react'
import { createAction } from '@reduxjs/toolkit'
import {
  SET_CURR_PORTFOLIO_SECTION,
  LEAVE_CURR_PORTFOLIO_SECTION,
  SET_PORTFOLIO_LANDING_REF,
} from './action.types'

// refs
export const setPortfolioLandingRef = createAction<
  React.RefObject<HTMLDivElement>
>(SET_PORTFOLIO_LANDING_REF)

// current section
export const setPortfolioCurrentSection = createAction<string>(
  SET_CURR_PORTFOLIO_SECTION
)

export const leavePortfolioCurrentSection = createAction<string>(
  LEAVE_CURR_PORTFOLIO_SECTION
)
