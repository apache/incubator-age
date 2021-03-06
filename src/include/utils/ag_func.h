/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

#ifndef AG_AG_FUNC_H
#define AG_AG_FUNC_H

#include "postgres.h"

#define CREATE_CLAUSE_FUNCTION_NAME "_cypher_create_clause"
#define SET_CLAUSE_FUNCTION_NAME "_cypher_set_clause"
#define DELETE_CLAUSE_FUNCTION_NAME "_cypher_delete_clause"

bool is_oid_ag_func(Oid func_oid, const char *func_name);
Oid get_ag_func_oid(const char *func_name, const int nargs, ...);
Oid get_pg_func_oid(const char *func_name, const int nargs, ...);

#endif
