!function(n,i){"use strict";var t={init:function(){n(document).on("gform_post_conditional_logic",function(n,i,e){e&&e.length>1&&t.populate()}),t.populate()},populate:function(i){var t={username:n(".gf_username input, input.gf_username "),email:n(".gf_email input, input.gf_email"),plan:n(".gf_plan input, input.gf_plan"),subscription:n(".gf_subscription input, input.gf_subscription")};if(Plex.isSignedIn()){var e=Plex.getAuthInfo();if(e)if(i)sel$.val(e[i]);else{var u;n.each(t,function(n,i){switch(n){case"plan":u=e.subscription.plan?e.subscription.plan:"";break;case"subscription":u=e[n].active?"Yes":"No";break;default:u=e[n]}i.val(u)})}}}};PlexView.addAfterRenderHook(function(){t.init()})}(jQuery,window);