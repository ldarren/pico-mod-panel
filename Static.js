var
update=function(){
	var
	deps=this.deps,
	models=deps.models,
	fields=deps.fields

	if (!fields || !models) return
	
	var rows=[]

	for(var i=0,d,v; d=fields[i]; i++){
		if (!d.model){
			rows.push(d)
			continue
		}
		v=models[d.model]
		if (!v) continue

		for(var j=0,ps=d.props,pl=ps.length,p; j<pl; j++){
			p=ps[j]
			if (v.get) v=v.get(p)
			else v=v[p]
			if (!v){
				v='undefined'
				break
			}
		}

		rows.push({type:'static', label:d.label, value:v})
	}
	this.el.innerHTML=deps.tpl(rows)
}

return {
    tagName:'form',
    className: 'form',
    deps:{
		tpl:'file',
		models:'refs',
		fields:'list'
    },
    create: function(deps){
		for(var i=0,ms=deps.models,ks=Object.keys(ms),m; m=ms[ks[i]]; i++){
			this.listenTo(m,'update',update)
			this.listenTo(m,'reset',update)
		}

		update.call(this)
    }
}
