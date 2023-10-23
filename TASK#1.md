# Task #1 : T-Mobile Coding Challenge

# 1. What is done well?
  -	Use of nrwl schematics for directory/project structure.
  -	Use of NgRx State management
  -	Use of Facade pattern to hide underlying mechanics of NgRx actions and selectors.
  -	Use of DataPersistence's fetch method provides consistency when fetching data. 
    If there are multiple requests scheduled for the same action, it will only run the last one.


# 2. What would you change?
  -	Instead of exposing API key at UI layer, we can pass it from Middleware layer (HAPI) to Stocks API
  -	Add Gitignore file to avoid pushing local repo configuration changes to master.
  -	Instead of ‘this.data$.subscribe’ we can use ‘async’ pipe in chart.componet.html which resolves “Cannot read property 'subscribe' of      undefined” in unit test case
  -	Modification in Chart component to draw chart and share data from stocks component to chart using property binding.


# 3. Are there any code smells or problematic implementations?
  -	Unit Test cases in ‘app.component.spec.ts’ where assertion is made for h1 tag but in html it’s not there.
  -	*ng-if condition in ‘chart.component.html’
  -	Missing Imports and Providers in Unit Test cases.