package com.enirisst.rso_api.repositories;
import com.enirisst.rso_api.models.*;
import com.enirisst.rso_api.row_mappers.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
@Repository
public class QueriesRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;





    public List<Nut1> nut1_query(){
        String sql_query ="SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,COUNT(*) as accident_number FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID ORDER BY nuts3.nut,TROX.YEAR_ID";
        return jdbcTemplate.query(sql_query, new Nut1Mapper());
    }
    //nuts
    public List<Nut2> nut23_query(String sql_query,boolean rounded,int dec){

        return jdbcTemplate.query(sql_query, new Nut2Mapper(rounded,dec));
    }
    //kd
    public List<Kd> kd_query(String sql_query, boolean rounded, int dec){

        return jdbcTemplate.query(sql_query, new KdMapper(rounded,dec));
    }

    public List<E> E_query(String sql_query){
        return jdbcTemplate.query(sql_query,new EMapper());
    }

    //nut32
    public List<Nut32> nut32_query(){
        String sql_query ="SELECT nuts3.eu_code, nuts3.nut, TROX.YEAR_ID, Count(*) as count,nuts3.unemployment,'Δεν υπάρχουν δεδομένα' AS indicator FROM TROX  LEFT JOIN nuts3 ON (nuts3.code=Left(TROX.GEOCODE_ACC_CL,2)) AND (nuts3.year = TROX.YEAR_ID) GROUP BY nuts3.eu_code, nuts3.nut, TROX.YEAR_ID, nuts3.unemployment ORDER BY nuts3.nut, TROX.YEAR_ID;";
        return jdbcTemplate.query(sql_query,new Nut32Mapper());
    }
  /*  public List<Nut2> nut2_query(){
        String sql_query ="SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(Count(*) * 1000000.000000)/nuts3.population AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,nuts3.population ORDER BY nuts3.nut,TROX.YEAR_ID";
        return jdbcTemplate.query(sql_query, new Nut2Mapper());
    }

    public List<Nut2> nut3_query(){
        String sql_query ="SELECT nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,(Sum(TROX.PATH_DEAD_NR) * 1000000.000000)/nuts3.population AS indicator FROM TROX LEFT JOIN nuts3 ON (nuts3.year=TROX.YEAR_ID) AND (LEFT(TROX.GEOCODE_ACC_CL,2)=nuts3.code) GROUP BY nuts3.eu_code,nuts3.nut,TROX.YEAR_ID,nuts3.population ORDER BY nuts3.nut,TROX.YEAR_ID";
        return jdbcTemplate.query(sql_query, new Nut2Mapper());
    }*/
}
