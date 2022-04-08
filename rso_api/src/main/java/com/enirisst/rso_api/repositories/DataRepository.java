package com.enirisst.rso_api.repositories;
import com.enirisst.rso_api.models.AREA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class DataRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    public String return_loc_table(int type){
        switch (type){
            case 0:
                return "nuts3";
            case 1:
                return "KalMun";
            case 2:
                return "POPULATION";
            default:
                return null;
        }
    }
    public String return_loc_field(int type){
        switch (type){
            case 0:
                return "nut";
            case 1:
                return "Muname";
            case 2:
                return "Περιγραφή";
            default:
                return null;
        }
    }


    public List<String> RetrieveLoc(int type){
        String table=return_loc_table(type);
        String field=return_loc_field(type);
        String query="SELECT DISTINCT "+field+" FROM "+table;
        System.out.print(query);
        return  jdbcTemplate.query(query,

                new RowMapper<String>() {
                    @Override
                    public String mapRow(ResultSet rs, int rowNum) throws SQLException {
                        return new String(rs.getString(field));
                    }
                });
    }



    public List<AREA> findAll() {
        return jdbcTemplate.query(
                "select * from AREA WHERE AREA_KM2>1000 ",
                new RowMapper<AREA>() {
                    @Override
                    public AREA mapRow(ResultSet rs, int rowNum) throws SQLException {
                        return new AREA(rs.getString("CODE_ELSTAT"), rs.getString("NAME"), rs.getString("PERIFEREIA"), rs.getDouble("AREA_KM2"));
                    }
                });


    }
}
