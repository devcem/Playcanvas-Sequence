var Sequence = pc.createScript('sequence');

Sequence.attributes.add('keyframe_data', { type : 'string' });
Sequence.attributes.add('auto_play', { type : 'boolean' });

Sequence.prototype.initialize = function() {
    this.keyframes = {};
    
    this.variables = {
        position_x : 0,
        position_y : 0,
        position_z : 0,
        rotation_x : 0,
        rotation_y : 0,
        rotation_z : 0
    };
    
    //Set default
    var position = this.entity.getPosition().clone();
    
    this.variables.position_x = position.x;
    this.variables.position_y = position.y;
    this.variables.position_z = position.z;
    
    var rotatiton = this.entity.getEulerAngles().clone();
    this.variables.rotation_x = rotatiton.x;
    this.variables.rotation_y = rotatiton.y;
    this.variables.rotation_z = rotatiton.z;
    
    this.isPlaying = false;
    
    this.keyframes = JSON.parse(this.keyframe_data);
    
    if(this.auto_play){
        this.play(Object.keys(this.keyframes)[0]);
    }
};

Sequence.prototype.update = function(dt) {
    if(this.isPlaying){
        this.entity.setPosition(
            this.variables.position_x,
            this.variables.position_y,
            this.variables.position_z
        );
        
        this.entity.setEulerAngles(
            this.variables.rotation_x,
            this.variables.rotation_y,
            this.variables.rotation_z
        );
    }
};

Sequence.prototype.play = function(name) {
    if(this.keyframes[name]){
        if(!this.isPlaying){
            var animations = this.keyframes[name];
            var timeline   = new TimelineMax({ 
                paused : true, 
                onCompleteParams : [this],
                onComplete : function(self){
                    self.isPlaying = false;
                } 
            });
            
            for(var animationIndex in animations){
                var animation = animations[animationIndex];
                
                timeline.add(TweenMax.to(this.variables, animation.duration, { 
                    delay : animation.delay, 
                    position_x : animation.position.x,
                    position_y : animation.position.y,
                    position_z : animation.position.z,
                    rotation_x : animation.rotation.x,
                    rotation_y : animation.rotation.y,
                    rotation_z : animation.rotation.z
                }));
            }
            
            timeline.play();
            this.isPlaying = true;
        }else{
            console.error('A sequence currently in play.');
        }
    }else{
        console.error('Sequence not found!');
    }
};