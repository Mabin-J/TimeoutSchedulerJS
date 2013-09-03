TimeoutScheduler (JavaScript)
================

Timeout Scheduler for invoke object

Usage
-----
```javascript
loop{
	var tmpRunnableObject = new RunnableObject();
	tmpRunnableObject.var = value;
	tmpRunnableObject.run = function(){	// Required
		// TODO: Action with this.var;
	};

	TimeoutScheduler.addJob(tmpRunnableObject, timeout);
}
```

Sample
------
http://mabin359.github.io/TimeoutScheduler/sample.htm
