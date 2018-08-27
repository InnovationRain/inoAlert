var inoAlert = {
    item : "",
    alignment  : "toast-top-right",
    toasts : [],
    closeIcon : false,
    type : "error",
    time : 2000,
    toastCount : 0,
    animations :{
        open : [
            'slide-left'
        ],
        close : [
            'slide-right'
        ]
    },
    toastOpenAnimation :  'slide-left',
    toastCloseAnimation : 'slide-right',

    init : function(obj){
        this.alignment  = obj.alignment;
        this.closeIcon  = obj.closeIcon;
        this.time = obj.time;
        this.toastCloseAnimation = obj.toastCloseAnimation;
        this.toastOpenAnimation = obj.toastOpenAnimation;
    },

    toastRender : function (type,message,header) {
        this.toastCount++;
        var toastId = "toast_"+this.toastCount;
        this.toasts.push(toastId);

        var x;
        x = this.renderParentBlock(this.alignment);
        var toast = document.createElement('div');
        toast.id = toastId;
        toast.classList.add(this.toastOpenAnimation);
        toast.classList.add("ino-toast");

        if(this.closeIcon){
            var closer_icon = document.createElement('div');
            closer_icon.className = "ino-close-icon";
            closer_icon.setAttribute('parent-id',toastId);
            closer_icon.innerHTML = "X";
            closer_icon.onclick = function (){
                var toastIndex = this.getAttribute('parent-id');
                var t = document.getElementById(toastIndex);
                t.remove();
            };
            toast.appendChild(closer_icon);
        }

        if(this.alignment){
            toast.classList.add(this.alignment);
        }

        toast.classList.add(type);

        var toastHeader = document.createElement('div');
        toastHeader.className = "ino-toast-header";
        toastHeader.innerHTML = header;
        var toastDescription = document.createElement('div');
        toastDescription.className = "ino-toast-info";
        toastDescription.innerHTML = message;
        var time = this.time;
        if(time > 0){

            setTimeout(function () {
              toast.classList.remove(inoAlert.toastOpenAnimation);
              toast.classList.add(inoAlert.toastCloseAnimation);
            },time-200);

            setTimeout(function () {
              toast.remove();
            },time);

        }

        toast.appendChild(toastHeader);
        toast.appendChild(toastDescription);

        x.appendChild(toast);
        document.body.appendChild(x);
    },
    renderParentBlock : function(alignment){
        switch (alignment) {
            case 'toast-bottom-right':
            case 'toast-top-right':
                if(document.getElementById("toast-parent-right") === null){
                    var block  = document.createElement('div')
                    block.id = "toast-parent-right";
                    block.className = 'toast-parent-toast';
                    return block;
                }else{
                    return document.getElementById('toast-parent-right');
                }
                break;
            case 'other-alignment':
                //TODO
                break;
        }
    },
    error : function (message,header) {
        this.toastRender("ino-error",message,header);
    },

    success: function (message,header) {
        this.toastRender("ino-success",message,header);
    },
    warning: function (message,header) {
        this.toastRender("ino-warning",message,header);
    }
};


