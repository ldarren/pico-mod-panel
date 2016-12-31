var
update=function(){
	var
	deps=this.deps,
	models=deps.models,
	fields=deps.fields

	if (!fields || !models) return
	
	var rows=[]

	for(var i=0,d,m,v; d=fields[i]; i++){
		if (!d.model){
			rows.push(d)
			continue
		}
		m=models[d.model]
		if (!m) continue
		v=m.get(d.field)
		v=v && d.value?v.get(d.value):v
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
