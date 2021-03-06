package com.enirisst.rso_api.repositories;
import com.enirisst.rso_api.models.AREA;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import org.json.JSONObject;
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

    public JSONArray transformloclist(List<String> locs,String label){
        JSONArray jsonlocs=new JSONArray();
        JSONObject obj=new JSONObject();
        String[] names = {"label", "value", "group"};
        for (String loc : locs){
            obj=new JSONObject();
            for (int j=0;j<names.length;j++){
                if(j<2){
                    obj.put(names[j],loc);
                }
                else{
                    obj.put(names[j],label);
                }
            }
            jsonlocs.put(obj);
        }
            return jsonlocs;
    }


    public List<String> RetrieveLoc(int type){
        String table=return_loc_table(type);
        String field=return_loc_field(type);
        String query="SELECT DISTINCT "+field+" FROM "+table;//+" ORDER BY "+field;
        System.out.print(query);
        return  jdbcTemplate.query(query,

                new RowMapper<String>() {
                    @Override
                    public String mapRow(ResultSet rs, int rowNum) throws SQLException {
                      //  System.out.println(rs.getString(field));
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
