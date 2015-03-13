
    module = angular.module("appDisciplina",[]);
    
    module.controller("DisciplinaController",["$scope", "$http", function ($scope, $http){
             function novo(){
            $scope.disciplina = {
                id:"",
                nome:"",
                cargaHoraria:"",
                peso:""
            };
            $scope.isNovo = true;
        }
        
        novo();
        
        $scope.salvar = function (){
            $http.post("/disciplinas",$scope.disciplina).sucsses(function (){
                alert("Salvo!");
                novo();
            }).error()
        };
    }]);