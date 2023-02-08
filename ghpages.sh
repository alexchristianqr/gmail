#!/bin/bash

set -e

# VARIABLES LOCALES
KEY=''
VALUE=''

## VALORES POR DEFECTO
VALUE_TAG=''
VALUE_DIRECTORY='www'
VALUE_BRANCH='main'
VALUE_EXEC='build'
VALUE_REPOSITORY='alexchristianqr/gmail'
VALUE_DELETED_TAG='false'
VALUE_PUSH_GHPAGES='true'

## VALORES PARA USAR EN LA EJECUCION
TAG=''
DIRECTORY=''
BRANCH=''
EXEC=''
REPOSITORY=''
DELETED_TAG=''
PUSH_GHPAGES=''

# MOSTRAR MENSAJE DE ERROR DE ARGUMENTO TAG
error_arg_tag() {
  echo "[ OBLIGATORIO ]"
  echo "-t=$VALUE_TAG, --tag=$VALUE_TAG ........................... Estructura de un tag [NivelMayor.NivelMenor.NivelBugfix]"
  exit 1
}

# MOSTRAR MENSAJE DE ERROR GENERAL
error_args_general() {
  echo "[ COMANDOS CLI ]"
  echo "-t, --tag ........................... structura de un tag [NivelMayor.NivelMenor.NivelBugfix]"
  echo "-dt, --deleted-lasttag .............. Eliminar último tag registrado"
  echo "-b, --branch ........................ Rama git"
  echo "--exec .............................. Comando de compilación"
  echo "-o, --out-dir ....................... Carpeta de compilación"
  echo "--repository ........................ Repositorio git"
  echo "-gp, --github-pages ................. Utilizar github pages"
  echo
  echo "[ DOCUMENTACION ]"
  echo "Repositorio github: https://github.com/alexchristianqr/sh-ghpages"
  echo
  echo "[ AUTOR ]"
  echo "Usuario: Alex Christian"
  echo "Email: alexchristianqr@gmail.com"
  echo "Repositorio github: https://github.com/alexchristianqr"
  exit 1
}

# ELIMINAR TAG
delete_tag() {
  TAG="$VALUE_TAG"

  set -e
  git push --delete origin "v$TAG"
  git tag -d "v$TAG"
}

# AGREGAR TAG
add_tag() {
  TAG="$VALUE_TAG"

  set -e
  git tag -a -m "New tag release v$TAG" "v$TAG"
}

# DESPLEGAR EN GITHUB PAGES
deploy_to_ghpages() {
  TAG="$VALUE_TAG"
  EXEC="$VALUE_EXEC"
  DIRECTORY="$VALUE_DIRECTORY"
  REPOSITORY="$VALUE_REPOSITORY"
  BRANCH="$VALUE_BRANCH"
  PUSH_GHPAGES="$VALUE_PUSH_GHPAGES"

  set -e
  git push origin "v$TAG"

  if [[ "$PUSH_GHPAGES" == 'true' ]]; then
    npm run "$EXEC"

    cd "$DIRECTORY"

    git init
    git add -A
    git commit -m "New deployment for release v$TAG"
    git push -f "git@github.com:$REPOSITORY.git" "$BRANCH:gh-pages"

    cd -

    rm -rf "$DIRECTORY"
  else
    exit 1
  fi
}

# VALIDAR VALORES DE LOS ARGUMENTOS OBLIGATORIOS
validate_values_args() {
  TAG="$VALUE_TAG"
  DELETED_TAG="$VALUE_DELETED_TAG"

  # VALIDAR PARAMETROS REQUERIDOS OBLIGATORIAMENTE
  if [[ "$TAG" == '' ]]; then
    error_arg_tag
  fi

  if [[ "$DELETED_TAG" == 'true' ]]; then
    delete_tag
  fi
}

# PROCESAR ARGUMENTOS
process_args() {
  if [ -z "$1" ]; then
    error_args_general
  fi

  # ITERAR ARGUMENTOS CLI
  for ARGUMENT in "$@"; do

    KEY=$(echo "$ARGUMENT" | cut -f1 -d=)

    # SET LLAVE Y VALOR
    KEY_LENGTH=${#KEY}
    VALUE="${ARGUMENT:$KEY_LENGTH+1}"

    # VALIDAR LLAVE
    if [[ "$KEY" ]]; then
      if [[ "$KEY" == '-h' ]] || [[ "$KEY" == '--help' ]]; then
        error_args_general
      elif [[ "$KEY" == '-t' ]] || [[ "$KEY" == '--tag' ]]; then
        VALUE_TAG="$VALUE"
      elif [[ "$KEY" == '-o' ]] || [[ "$KEY" == '--out-dir' ]] || [[ "$KEY" == '--out-directory' ]]; then
        VALUE_DIRECTORY="$VALUE"
      elif [[ "$KEY" == '-b' ]] || [[ "$KEY" == '--branch' ]]; then
        VALUE_BRANCH="$VALUE"
      elif [[ "$KEY" == '--exec' ]]; then
        VALUE_EXEC="$VALUE"
      elif [[ "$KEY" == '--repository' ]]; then
        VALUE_REPOSITORY="$VALUE"
      elif [[ "$KEY" == '-dt' ]] || [[ "$KEY" == '--deleted-lasttag' ]]; then
        VALUE_DELETED_TAG="$VALUE"
      elif [[ "$KEY" == '-gp' ]] || [[ "$KEY" == '--github-pages' ]]; then
        VALUE_PUSH_GHPAGES="$VALUE"
      else
        error_args_general
      fi
    else
      error_args_general
    fi

    # echo "CORRECTO: $KEY=$VALUE"
  done

  # VALIDAR PARAMETROS OBLIGATORIOS
  validate_values_args

  # CREAR TAG
  add_tag

  # EJECUTAR ACTION IN GITHUB PAGES
  deploy_to_ghpages
}

# MENU PRINCIPAL
main() {
  process_args "$@"
}

# CONSTRUCTOR
main "$@"
