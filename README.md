# Intermittent fasting app

A personal tool to help me track intermittent fasting.

It lets you track fasting and eating windows with a countdown. 

You can set your fasting and eating window times and it will store them in local storage, and then it tells you what you're supposed to be doing along with a countdown. 

==simplify UI==

## Thoughts
If I ever come back to this I think if I ever wanted to track my adherance to this with a chart or a heatmap then just using S3 json file + lambda is the way to go. 

For the UI the way to do this is to basically have a "Log first meal" and "Log last meal" button to track the starting and ending of my eating window. Ideally I'd only press those buttons when the app says "eating window". That's the basic flow of this. 



## Todo 
- [ ] Integrate with s3 json storage + lambda 
- [ ] Create "log first/last meal" buttons and backend logic 
- [ ] Add a heatmap so I can see some idea of progress and consistency in my habit (do I even want this without login?)
- [ ] Think through the "Reset to now" behaviour a bit more