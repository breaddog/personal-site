import React from 'react'
import {
  ActionReducerMapBuilder,
  PayloadAction,
  createReducer
} from '@reduxjs/toolkit'

import {
  setPortfolioCurrentSection,
  leavePortfolioCurrentSection
} from './action'

import { PORTFOLIO_SECTIONS } from '../../shared/sections'

const { landing, developer, manager, journey, highlights, contacts } =
  PORTFOLIO_SECTIONS

interface PortfolioSectionState {
  section: string
}

const initialState: PortfolioSectionState = {
  section: landing.key,
}

export default createReducer(
  initialState,
  (builder: ActionReducerMapBuilder<PortfolioSectionState>) => {
    builder
      .addCase(
        setPortfolioCurrentSection,
        (state, action: PayloadAction<string>) => {
          const { payload } = action

          switch (payload) {
            // fallthrough on undefined/blank cases
            case undefined:
            case null:
              break

            case landing.key:
              state.section = landing.key
              break
            case developer.key:
              state.section = developer.key
              break
            case manager.key:
              state.section = manager.key
              break
            case journey.key:
              state.section = journey.key
              break
            case highlights.key:
              state.section = highlights.key
              break
            case contacts.key:
              state.section = contacts.key
              break

            default:
              break
          }
        }
      )
      .addCase(leavePortfolioCurrentSection, (state) => {
        state.section = initialState.section
      })
  }
)
