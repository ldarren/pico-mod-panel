return {
    tagName:'form',
    className: 'form',
    deps:{
		tpl:'file',
		models:'refs',
		fields:'list'
    },
    create: function(deps){
		var
		models=deps.models,
		fields=deps.fields

		if (!fields || !models) return
		
		var
		rows=[],
		i,d,m,v

		for(i=0; d=fields[i]; i++){
			m=models[d.model]
			if (!m) continue
			v=m.get(d.field)
			if (!v) continue
			v=d.value?v[d.value]:v
			rows.push({type:'static', label:d.label, value:v})
		}
		this.el.innerHTML=deps.tpl(rows)
    }
}
