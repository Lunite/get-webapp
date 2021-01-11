import React from "react"

import PageWrapper from "~/components/layout/page-wrapper"

import "./src/styles/index.scss";

import { CookieService } from './src/utils/cookies.ts';

const VISITS_COOKIE_KEY = 'visits_before_quote';
const VISITS_TIMESTAMP_KEY = 'last_visit_timestamp';

const queryParamKeys = [
  'special_price',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'name',
];

const DAY_IN_MS = 86400000;

const tomorrowTimestampOrUndefined = (timestampThresholdInMs) => {
  const tomorrowTimestamp = Date.now() + DAY_IN_MS;

  if (!timestampThresholdInMs) {
    return tomorrowTimestamp;
  }

  const hasADayPassed = Number(timestampThresholdInMs) - Date.now() >= DAY_IN_MS;

  return hasADayPassed ? tomorrowTimestamp : undefined;
}

export const wrapPageElement = ({ element }) => {
  const context = element?.props?.pageContext

  // Increase the number of visits
  const visitsCookie = CookieService.getCookie(VISITS_COOKIE_KEY);
  const visitsTimestamp = CookieService.getCookie(VISITS_TIMESTAMP_KEY);

  const newVisitTimestamp = tomorrowTimestampOrUndefined(visitsTimestamp);

  // Only save a visit per day
  if (newVisitTimestamp) {
    const numberOfVisits = visitsCookie ? Number(visitsCookie.value)+1 : 1;
    CookieService.createCookie(VISITS_COOKIE_KEY, numberOfVisits);
    CookieService.createCookie(VISITS_TIMESTAMP_KEY, newVisitTimestamp);
  }

  // Retrieve data from query params
  const url = new URL(document.location.href);
  const params = new URLSearchParams(url.search);
  const queryParams = queryParamKeys.reduce((qp, key) => {
    const queryValue = params.get(key);
    if (queryValue) {
      qp[key] = queryValue;
    }
    return qp;
  }, {});

  const qpKeys = Object.keys(queryParams);
  // Save data from queryParams (if any) into cookies
  if (qpKeys.length > 0) {
      qpKeys.forEach(key => {
        CookieService.createCookie(key, queryParams[key]);
      });
  }

  return <PageWrapper context={context}>{element}</PageWrapper>
}
