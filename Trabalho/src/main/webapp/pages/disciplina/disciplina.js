
module = angular.module("appDisciplina", []);

module.controller("DisciplinaController", ["$scope", "$http", function($scope, $http) {
        function novo() {
            $scope.disciplina = {
                id: "",
                nome: "",
                cargaHoraria: "",
                peso: ""
            };
            $scope.isNovo = true;
        }

        novo();

        $scope.salvar = function() {
            if ($scope.disciplina.id == 0) {
                alert("ID é obrigatório");
            }
            if ($scope.isNovo) {
                $http.post("/disciplinas", $scope.disciplina).success(function() {
                    alert("Salvo!");
                    $scope.atualizar();
                    novo();
                }).error(deuErro);
            } else {
                $http.put("/disciplinas", $scope.disciplina).success(function() {
                    alert("Alterado!");
                    $scope.atualizar();
                    novo();
                }).error(deuErro);
            }
        };

        $scope.excluir = function(disciplina) {
            $http.delete("/disciplinas", disciplina.id).success(function() {
                alert("Excluido!");
                $scope.atualizar();
            }).error(deuErro);
        };

        $scope.editar = function(disciplina) {
            $scope.disciplina = angular.copy(disciplina);
            $scope.isNovo = false;
        };

        $scope.atualizar = function() {
            $http.get("/disciplinas").success(onSuccess).error(onError);

            function onSuccess(data) {
                $scope.disciplinas = data;
            }
            function onError(data) {
                alert("Deu erro");
            }
        }

        function deuErro() {
            alert("Erro!");
        }
    }]);