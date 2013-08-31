function JobTreeNode(jobTicket){
	this.jobTicket = jobTicket;
	this.left = null;
	this.right = null;
	this.put = function(jobTicket){
		var thisTimeline = this.jobTicket.timeline;
		var targetTimeline = jobTicket.timeline;
		
		if(thisTimeline <= targetTimeline){
			if(this.right == null){
				this.right = new JobTreeNode(jobTicket);
			} else {
				this.right.put(jobTicket);
			}
		} else {
			if(this.left == null){
				this.left = new JobTreeNode(jobTicket);
			} else {
				this.left.put(jobTicket);
			}
		}
	};
	
	this.get = function(timeline){
		var thisTimeline = this.jobTicket.timeline; 
		
		if(thisTimeline == timeline && !this.jobTicket.isused){
			this.jobTicket.isused = true;
			return this.jobTicket;
		}else {
			var getTarget = null;
			if(thisTimeline <= timeline)
				getTarget = this.right;
			else
				getTarget = this.left;
			
			if(getTarget == null){
				if(this.jobTicket.isused)
					return null;
				this.jobTicket.isused = true;
				return this.jobTicket;
			}else {
				var tmpResult = getTarget.get(timeline);
				if(tmpResult){
					return tmpResult
				} else {
					if(this.jobTicket.isused)
						return null;
					this.jobTicket.isused = true;
					return this.jobTicket;
				}
			}
				
		}
	};
}

function JobTicket(timeline){
	this.timeline = timeline;
	this.jobIdx = null;
	this.jobObject = null;
	this.isused = false;
	this.timeout = 0;
}

var TimeoutScheduler = new Object();

var _initJobTicket = new JobTicket(0);
_initJobTicket.isused = true;
TimeoutScheduler.data = new JobTreeNode(_initJobTicket);

TimeoutScheduler.playedTimeline = 0;

TimeoutScheduler.addJob = function(runnableObject, timeout){
	var thisTimeline = (this.playedTimeline + timeout);
	
	var tmpJobTicket = new JobTicket(thisTimeline);
	tmpJobTicket.jobObject = runnableObject;
	tmpJobTicket.timeout = timeout;
	
	this.data.put(tmpJobTicket);
	
	setTimeout(function(){
		var thisTimeline = TimeoutScheduler.playedTimeline;
		var thisJobTicket = TimeoutScheduler.data.get(thisTimeline);
		
		if((thisJobTicket.timeline) > TimeoutScheduler.playedTimeline)
			TimeoutScheduler.playedTimeline = (thisJobTicket.timeline);
		
		var jobObject = thisJobTicket.jobObject;
		var jobIdx = thisJobTicket.jobIdx;
		
		jobObject.run();
	}, timeout);
};

function RunnableObject(){
	this.run = function(){
		
	};
}