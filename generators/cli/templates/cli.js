#!/usr/bin/env node
'use strict'

import yargs from 'yargs'

import <%= camelName %> from './'

yargs
  .usage('Usage: $0 [an argument]')
  .demand(1)

<%= camelName %>(yargs.argv)

