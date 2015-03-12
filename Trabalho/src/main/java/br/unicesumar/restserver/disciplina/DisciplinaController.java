package br.unicesumar.restserver.disciplina;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/disciplinas")
@Transactional
public class DisciplinaController {
    
    @Autowired
    private EntityManager em;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<Disciplina> getDisciplinas(){
        List<Disciplina> disciplinas = null;
        disciplinas = (List<Disciplina>) em.createQuery("select Disciplina d");
        return disciplinas;
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public void criarDisciplina(@RequestBody Disciplina d){
        em.persist(d);
    }
    
    @RequestMapping(method = RequestMethod.PUT)
    public void alterarDisciplina(@RequestBody Disciplina d){
        excluirDisciplina(d.getId());
        criarDisciplina(d);
    }
    
    @RequestMapping(method = RequestMethod.DELETE)
    public void excluirDisciplina(@PathVariable Long id){
        em.createQuery("delete Disciplina d where id="+id);
    }
}
