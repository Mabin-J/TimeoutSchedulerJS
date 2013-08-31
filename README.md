TimeoutScheduler
================

Timeout Scheduler (JavaScript)

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
