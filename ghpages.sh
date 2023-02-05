#!/bin/bash

set -e

# VARIABLES LOCALES
KEY=''
VALUE=''

## PARA SETEAR EN LA ITERACION DE ARGUMENTOS
VALUE_TAG=''
VALUE_DIRECTORY='dist'
VALUE_BRANCH='main'
VALUE_EXEC='build'
VALUE_REPOSITORY='alexchristianqr/gmail'

## PARA USAR EN LAS EJECUCIONES
TAG=''
DIRECTORY=''
BRANCH=''
EXEC=''
REPOSITORY=''

# MOSTRAR MENSAJE DE ERROR DE ARGUMENTO TAG
error_arg_tag() {
  echo "SOLUCION: Debes especificar un tag así: --tag=0.0.0 (obligatorio) NOTA: La estructura de un tag es [NivelMayor.NivelMenor.NivelBugfix]"
  exit 1
}

# MOSTRAR MENSAJE DE ERROR DE ARGUMENTO DIRECTORY
error_arg_directory() {
  echo "SOLUCION: Debes especificar un directorio así --dir=$VALUE // --directory=$VALUE (opcional)"
  exit 1
}

# MOSTRAR MENSAJE DE ERROR GENERAL
error_args_general() {
  echo "SOLUCION:"
  echo "- Debes especificar un tag así: --tag=$VALUE_TAG (obligatorio) NOTA: La estructura de un tag es [NivelMayor.NivelMenor.NivelBugfix]"
  echo "- Debes especificar un directorio así: --dir=$VALUE_DIRECTORY // --directory=$VALUE_DIRECTORY (opcional)"
  echo "- Debes especificar un branch así: --branch=$VALUE_BRANCH (opcional)"
  echo "- Debes especificar un exec así: --exec=$VALUE_EXEC (opcional) NOTA: El parametro exec es el comando de compilación de tu proyecto"
  echo "- Debes especificar un repositorio así: --repository=$VALUE_REPOSITORY (opcional)"
  exit 1
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

  git push origin "v$TAG"

  npm run "$EXEC"

  cd "$DIRECTORY"

  git init
  git add -A
  git commit -m "New deployment for release v$TAG"
  git push -f "git@github.com:$REPOSITORY.git" "$BRANCH:gh-pages"

  cd -
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
      if [[ "$KEY" == '-t' ]] || [[ "$KEY" == '--tag' ]]; then
        VALUE_TAG="$VALUE"
      elif [[ "$KEY" == '-d' ]] || [[ "$KEY" == '--dir' ]] || [[ "$KEY" == '--directory' ]]; then
        VALUE_DIRECTORY="$VALUE"
      elif [[ "$KEY" == '-b' ]] || [[ "$KEY" == '--branch' ]]; then
        VALUE_BRANCH="$VALUE"
      elif [[ "$KEY" == '--exec' ]]; then
        VALUE_EXEC="$VALUE"
      elif [[ "$KEY" == '--repository' ]]; then
        VALUE_REPOSITORY="$VALUE"
      else
        error_args_general
      fi
    else
      error_args_general
    fi

    # echo "CORRECTO: $KEY=$VALUE"
  done

  # VALIDAR PARAMETROS REQUERIDOS OBLIGATORIAMENTE
  if [[ "$VALUE_TAG" == '' ]]; then
    error_arg_tag
  fi

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
